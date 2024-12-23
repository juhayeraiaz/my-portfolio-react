import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddProjects = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [images, setImages] = useState(Array(3).fill(null));

    const imageStorageKey = '4295ac4d47b569312bea67b440cdbdbb';

    // Function to format the date in the desired format
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const suffix = (day === 1) ? 'st' : (day === 2) ? 'nd' : (day === 3) ? 'rd' : 'th';
        return `${day}${suffix} ${month} ${year}`;
    };

    const onSubmit = async (data) => {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);

        const uploadPromises = images.map((image, index) => {
            const formData = new FormData();
            formData.append('image', image);
            const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
            return fetch(url, {
                method: 'POST',
                body: formData
            }).then((res) => res.json()).then((result) => {
                if (result.success) {
                    return { [index === 0 ? 'img' : `img${index + 1}`]: result.data.url };
                }
                return null;
            });
        });

        Promise.all(uploadPromises)
            .then((results) => {
                const imagesObj = results.reduce((acc, curr) => {
                    if (curr) {
                        return { ...acc, ...curr };
                    }
                    return acc;
                }, {});

                const project = {
                    title: data.title,
                    description: data.description,
                    siteLink: data.siteLink,
                    codeLink: data.codeLink,
                    date: formattedDate,
                    ...imagesObj
                };

                fetch('http://localhost:5000/projects', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(project)
                })
                    .then((res) => res.json())
                    .then((inserted) => {
                        if (inserted.insertedId) {
                            toast.success('Project added successfully');
                            reset();
                        } else {
                            toast.error('Failed to add the Project');
                        }
                    });
            })
            .catch((error) => {
                console.error('Error uploading images:', error);
            });
    };

    const handleImageChange = (event, index) => {
        const newImages = [...images];
        newImages[index] = event.target.files[0];
        setImages(newImages);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="mb-1 mt-4">Add a Project</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="title">
                            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Write your Title"
                                {...register('title', { required: 'Title is Required' })}
                            />
                            {errors.title && <Form.Text className="text-danger">{errors.title.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="description">
                            <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Write your content here"
                                {...register('description', { required: 'Description is Required' })}
                            />
                            {errors.description && <Form.Text className="text-danger">{errors.description.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    {[0, 1, 2].map((index) => (
                        <Col md={4} key={index}>
                            <Form.Group controlId={`image${index}`}>
                                <Form.Label>{index === 0 ? 'Main Photo' : 'Optional Photo'} {index === 0 && <span className="text-danger">*</span>}</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => handleImageChange(event, index)}
                                />
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="siteLink">
                            <Form.Label>Enter The Site Link  <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter site link"
                                {...register('siteLink', { required: 'Site Link is Required' })}
                            />
                            {errors.siteLink && <Form.Text className="text-danger">{errors.siteLink.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="codeLink">
                            <Form.Label>Enter The Code Link  <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Code link"
                                {...register('codeLink', { required: 'Code Link is Required' })}
                            />
                            {errors.codeLink && <Form.Text className="text-danger">{errors.codeLink.message}</Form.Text>}
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">Add</Button>
            </Form>
        </div>
    );
};

export default AddProjects;
