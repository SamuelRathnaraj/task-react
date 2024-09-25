
import React, { useEffect, useState } from 'react';
import './UpdateUser.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "" 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDepartmentSelect = (department) => {
        setFormData({
            ...formData,
            department: department,
        });
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.log("Error fetching user:", error.message);
            }
        };
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: 'PATCH',
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("User Updated", data);
            navigate(`/dashboard`);
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <>
            <div className='center-form'>
                <h1>Edit Employee</h1>
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
                            required
                        />
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Group controlId="formBasicDepartment" style={{padding:'15px',fontSize:"20px",display:"flex"}}>
                            <Form.Label style={{paddingRight:"5px"}}>Department</Form.Label>
                            <DropdownButton
                                id="dropdown-department-button"
                                title={formData.department || "Select Department"}
                                onSelect={handleDepartmentSelect}
                                style={{paddingLeft:"20px"}}
                            >
                                <Dropdown.Item eventKey="HR">HR</Dropdown.Item>
                                <Dropdown.Item eventKey="Developer">Developer</Dropdown.Item>
                                <Dropdown.Item eventKey="Manager">Manager</Dropdown.Item>
                            </DropdownButton>
                        </Form.Group>
                    </Form.Group>
                    <Button variant='primary' type='submit' className='w-100'>
                        Update
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default UpdateUser;
