import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LuArrowLeft, LuCircleAlert, LuCircleCheck, LuImagePlus, LuLoaderCircle, LuUpload } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatProjectDate } from '../lib/projects';
import { cx } from '../lib/utils';
import './AddProject.css';

/*
 * Private admin tool for adding projects to the portfolio API.
 * Configure in .env.local:
 *   VITE_IMGBB_API_KEY=<your imgbb key>
 *   VITE_ADMIN_API_URL=http://localhost:5000   (default)
 */
const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const ADMIN_API = (import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const IMAGE_FIELDS = [
  { name: 'img', label: 'Main screenshot', required: true },
  { name: 'img2', label: 'Screenshot 2' },
  { name: 'img3', label: 'Screenshot 3' },
];

const URL_PATTERN = { value: /^https?:\/\/\S+\.\S+/i, message: 'Enter a full URL starting with http:// or https://' };

async function uploadImage(file) {
  const body = new FormData();
  body.append('image', file);
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, { method: 'POST', body });
  const json = await response.json().catch(() => ({}));
  if (!json.success) throw new Error(`Uploading “${file.name}” to imgbb failed.`);
  return json.data.url;
}

function ImageInput({ field, file, register, error }) {
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  return (
    <div className={cx('admin-image', error && 'admin-image--error')}>
      <input
        id={field.name}
        type="file"
        accept="image/*"
        className="visually-hidden"
        {...register(field.name, field.required ? { required: 'A main screenshot is required.' } : {})}
      />
      <label htmlFor={field.name} className="admin-image__drop">
        {preview ? <img src={preview} alt="" /> : <LuImagePlus aria-hidden="true" />}
        <span>
          {field.label}
          {field.required && <span className="admin__required"> *</span>}
        </span>
      </label>
      {error && <p className="field__error">{error.message}</p>}
    </div>
  );
}

export default function AddProject() {
  useDocumentTitle('Add a project — Admin');
  const [result, setResult] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const fileLists = useWatch({ control, name: IMAGE_FIELDS.map((f) => f.name) });

  const onSubmit = async (values) => {
    setResult(null);
    if (!IMGBB_KEY) {
      setResult({ tone: 'error', message: 'Missing VITE_IMGBB_API_KEY. Add it to .env.local and restart the dev server.' });
      return;
    }
    try {
      const urls = await Promise.all(
        IMAGE_FIELDS.map(({ name }) => (values[name]?.[0] ? uploadImage(values[name][0]) : null)),
      );
      const project = {
        title: values.title.trim(),
        description: values.description.trim(),
        siteLink: values.siteLink.trim(),
        codeLink: values.codeLink.trim(),
        date: formatProjectDate(new Date()),
      };
      IMAGE_FIELDS.forEach(({ name }, index) => {
        if (urls[index]) project[name] = urls[index];
      });

      const response = await fetch(`${ADMIN_API}/projects`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(project),
      });
      const inserted = await response.json().catch(() => ({}));
      if (!response.ok || !inserted.insertedId) throw new Error('The API did not confirm the new project.');

      setResult({ tone: 'success', message: `“${project.title}” was added to the portfolio.` });
      reset();
    } catch (error) {
      setResult({ tone: 'error', message: error.message || 'Something went wrong. Is the API running?' });
    }
  };

  return (
    <main className="admin">
      <meta name="robots" content="noindex, nofollow" />
      <div className="admin__inner">
        <header className="admin__header">
          <Link to="/" className="admin__back">
            <LuArrowLeft aria-hidden="true" /> Back to site
          </Link>
          <Logo />
        </header>

        <div className="admin__card card">
          <h1 className="admin__title">Add a project</h1>
          <p className="admin__subtitle">
            Images are uploaded to imgbb, then the project is saved to <code>{ADMIN_API}/projects</code>.
          </p>

          <form className="admin__form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={cx('field', errors.title && 'field--error')}>
              <label className="field__label" htmlFor="title">
                Title <span className="admin__required">*</span>
              </label>
              <input id="title" type="text" placeholder="Project name" {...register('title', { required: 'Title is required.' })} />
              {errors.title && <p className="field__error">{errors.title.message}</p>}
            </div>

            <div className={cx('field', errors.description && 'field--error')}>
              <label className="field__label" htmlFor="description">
                Description <span className="admin__required">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="What it is, what you built and the tech you used"
                {...register('description', { required: 'Description is required.' })}
              />
              {errors.description && <p className="field__error">{errors.description.message}</p>}
            </div>

            <fieldset className="admin__images">
              <legend className="field__label">Screenshots</legend>
              {IMAGE_FIELDS.map((field, index) => (
                <ImageInput
                  key={field.name}
                  field={field}
                  file={fileLists?.[index]?.[0]}
                  register={register}
                  error={errors[field.name]}
                />
              ))}
            </fieldset>

            <div className="admin__row">
              <div className={cx('field', errors.siteLink && 'field--error')}>
                <label className="field__label" htmlFor="siteLink">
                  Live site URL <span className="admin__required">*</span>
                </label>
                <input
                  id="siteLink"
                  type="url"
                  placeholder="https://…"
                  {...register('siteLink', { required: 'Site link is required.', pattern: URL_PATTERN })}
                />
                {errors.siteLink && <p className="field__error">{errors.siteLink.message}</p>}
              </div>
              <div className={cx('field', errors.codeLink && 'field--error')}>
                <label className="field__label" htmlFor="codeLink">
                  Source code URL <span className="admin__required">*</span>
                </label>
                <input
                  id="codeLink"
                  type="url"
                  placeholder="https://github.com/…"
                  {...register('codeLink', { required: 'Code link is required.', pattern: URL_PATTERN })}
                />
                {errors.codeLink && <p className="field__error">{errors.codeLink.message}</p>}
              </div>
            </div>

            {result && (
              <p className={cx('admin__result', `admin__result--${result.tone}`)} role="status">
                {result.tone === 'success' ? <LuCircleCheck aria-hidden="true" /> : <LuCircleAlert aria-hidden="true" />}
                {result.message}
              </p>
            )}

            <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LuLoaderCircle className="spin" aria-hidden="true" /> Uploading…
                </>
              ) : (
                <>
                  <LuUpload aria-hidden="true" /> Add project
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
