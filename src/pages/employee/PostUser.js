import React, { useState, useEffect } from 'react';
import { Button, DropdownButton, Dropdown, FormLabel, Row, Col } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import './PostUser.css';
import { useNavigate } from 'react-router-dom';

const PostUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const [employees, setEmployees] = useState([]);
    const [validationErrors, setValidationErrors] = useState({
        email: "",
        phone: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.log("Error fetching employees:", error.message);
            }
        };
        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setValidationErrors({
            email: "",
            phone: ""
        });
    };

    const handleDepartmentSelect = (department) => {
        setFormData({
            ...formData,
            department: department,
        });
    };

    const validateFormData = () => {
        let valid = true;
        const errors = {
            email: "",
            phone: ""
        };

        const emailExists = employees.some((employee) => employee.email === formData.email);
        if (emailExists) {
            errors.email = "Email is already taken.";
            valid = false;
        }

        const phoneExists = employees.some((employee) => employee.phone === formData.phone);
        if (phoneExists) {
            errors.phone = "Phone number is already taken.";
            valid = false;
        }

        setValidationErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFormData()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee created", data);
            alert("You have submitted the form successfully!");
            navigate("/Dashboard");
        } catch (error) {
            console.log("Error creating Employee", error.message);
        }
    };

    return (
        <>
            <div className='center-form'>
                <h1>Employee Form </h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.email} 
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.email}
                        </Form.Control.Feedback>

                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            isInvalid={!!validationErrors.phone}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {validationErrors.phone}
                        </Form.Control.Feedback>
                        
                        <Row className="align-items-center mt-3">
                            <Col xs="auto " style={{padding:'20px',fontSize:"25px"}}>
                                <FormLabel>Department</FormLabel>
                            </Col>
                            <Col>
                                <DropdownButton
                                className='p-2 '
                                    id="dropdown-department-button"
                                    title={formData.department ? formData.department : "Select"}
                                    onSelect={handleDepartmentSelect}
                                >
                                    <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
                                    <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
                                    <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button variant='primary' type='submit' className='w-100'>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default PostUser;

