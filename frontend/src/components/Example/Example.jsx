import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Example.css';

function Example() {
    //State to track value of various imp-ut fields
    //hooks, a lot of things that start with use are hooks
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0.01);
    const [previewImage, setPreviewImage] = useState("");
    const [imageUrl, setImageUrl] = useState({});




    //State to track errors for various imp-ut fields
    const [errors, setErrors] = useState({
        'country': null,
        'street-address': null,
        'city': null,
        'state': null,
        'latitude': null,
        'longitude': null,
        'description': null,
        'title': null,
        'price': null,
        'preview-image': null
    });
    //stephen needs to reteach this
    //mapping between field name and state update
    const setters = {
        'country': setCountry,
        'street-address': setStreetAddress,
        'city': setCity,
        'state': setState,
        'latitude': setLatitude,
        'longitude': setLongitude,
        'description': setDescription,
        'title': setTitle,
        'price': setPrice,
        'preview-image': setPreviewImage
    }
    // this is shared, only one
    //event, things that start with on are events
    const onInputChange = event => {
        //event.target is the HTML element that caused the event
        const name = event.target.name;
        const value = event.target.value;

        console.log(name, value);

        //Look up the setter function for the field that just changed
        const setter = setters[name];

        //Invoke the setter function and update the value
        setter(value);
    }

    //The HTML that makes up the component
    return (
        <div className={'example'}>
            <div className='section'>
                <div className='title'>
                    Create a new Spot? <br />
                    Where is your place located?
                </div>
                <div className='sub-title'>
                    Guests will only get your exact address once they book a reservation.
                </div>

                <div className='field'>
                    <label htmlFor='country'>Country</label>
                    <input
                        name='country'
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={onInputChange}
                    />
                    {errors['country'] && (<p className='errors'>{errors['country']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='street-address'>Street Address</label>
                    <input
                        name='street-address'
                        type='text'
                        placeholder='Address'
                        value={streetAddress}
                        onChange={onInputChange}
                    />
                    {errors['street-address'] && (<p className='errors'>{errors['street-address']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='city'>City</label>
                    <input
                        name='city'
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={onInputChange}
                    />
                    {errors['city'] && (<p className='errors'>{errors['city']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='state'>State</label>
                    <input
                        name='state'
                        type='text'
                        placeholder='State'
                        value={state}
                        onChange={onInputChange}
                    />
                    {errors['state'] && (<p className='errors'>{errors['state']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='latitude'>Latitude</label>
                    <input
                        name='latitude'
                        type='text'
                        placeholder='latitude'
                        value={latitude}
                        onChange={onInputChange}
                    />
                    {errors['latitude'] && (<p className='errors'>{errors['latitude']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='longitude'>Longitude</label>
                    <input
                        name='longitude'
                        type='text'
                        placeholder='longitude'
                        value={longitude}
                        onChange={onInputChange}
                    />
                    {errors['longitude'] && (<p className='errors'>{errors['longitude']}</p>)}
                </div>
            </div>
            <div className='section'>
                <div className='title'>
                    Describe your place to guests
                </div>
                <div className='sub-title'>
                    Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                </div>

                <div className='field'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        name='description'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={onInputChange}
                    >
                    </textarea>
                    {errors['description'] && (<p className='errors'>{errors['description']}</p>)}
                </div>
            </div>
            <div className='section'>
                <div className='title'>
                    Create a title for your spot
                </div>
                <div className='sub-title'>
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </div>
                <div className='field'>
                    <label htmlFor='title'>Title</label>
                    <input
                        name='title'
                        type='text'
                        placeholder='Name of your spot'
                        onChange={onInputChange}
                    />
                    {errors['title'] && (<p className='errors'>{errors['title']}</p>)}
                </div>
            </div>
            <div className='section'>
                <div className='title'>
                    Set a base price for your spot
                </div>
                <div className='sub-title'>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                </div>

                <div className='field'>
                    <label htmlFor='price'>$</label>
                    <input
                        name='price'
                        type='number'
                        step='.01'
                        min='.01'
                        placeholder='Price per night'
                        value={price}
                        onChange={onInputChange}
                    />
                    {errors['price'] && (<p className='errors'>{errors['price']}</p>)}
                </div>
            </div>
            <div className='section'>
                <div className='title'>
                    Create a title for your spot
                </div>
                <div className='sub-title'>
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </div>

                <div className='field'>
                    <label htmlFor='preview-image'>Preview Image</label>
                    <input
                        name='preview-image'
                        type='text'
                        placeholder='Preview image URL'
                        value={previewImage}
                        onChange={onInputChange}
                    />
                    {errors['preview-image'] && (<p className='errors'>{errors['preview-image']}</p>)}
                </div>
            </div>
            <div>
                <button className={'create-spot'}>
                    Create Spot
                </button>
            </div>

        </div>
    );
}

export default Example;
