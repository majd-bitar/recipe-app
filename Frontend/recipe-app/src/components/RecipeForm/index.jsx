import React, { useState } from 'react';
import Input from '../../base/Input';
import Button from '../../base/Button';
import TextArea from '../../base/TextArea';
import { useNavigate } from "react-router-dom";

import './style.css';

const RecipeForm = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [recipePicture, setRecipePicture] = useState(null);
    const userId = localStorage.getItem('userID'); 
    const nav = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setRecipePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name,
            ingredients,
            steps,
            recipe_picture: recipePicture,
            user_id: userId,
        };

        try {
            const response = await fetch('http://localhost/React-PHP-Recipe-App/recipe-app/Backend/public/api/create_recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                nav('/home');
            } else {
                alert(`Failed to create recipe: ${result.message}`);
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
            alert('An error occurred while creating the recipe.');
        }
    };

    return (
        <div className="container">
            <form className="form-container flex column full-height" onSubmit={handleSubmit}>
                <h1>Create a New Recipe</h1>
                <Input
                    placeHolder="Recipe Name"
                    type="text"
                    value={name}
                    onTextChange={(e) => setName(e.target.value)}
                />
                <TextArea
                    placeHolder="Ingredients"
                    type="text"
                    value={ingredients}
                    onTextChange={(e) => setIngredients(e.target.value)}
                />
                <TextArea
                    placeHolder="Steps"
                    type="text"
                    value={steps}
                    onTextChange={(e) => setSteps(e.target.value)}
                />
                <Input
                    placeHolder="https://upload ... spaghetti-carbonara.jpg"
                    type="text"
                    onTextChange={(e)=>setRecipePicture(e.target.value)}
                />
                <Button text="Create Recipe" type="submit" />
            </form>
        </div>
    );
};

export default RecipeForm;
