import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Example.css';

function Example({ spot = null }) {
    //State to track value of various imp-ut fields
    //hooks, a lot of things that start with use are hooks
    //setVariable is a function
    //useState returns a variable and a way to set that variable

    //what its doing
    //if spot that is being passed in has a country key use that value, else use empty string
    //why I am I doing it
    //if its a new form i want the fields to be empty 
    //and if I'm editing a form I want the information I submitted to be in the form

    //spot?.stupidfuckingvariable means if spot is null return undefined instead of error

    const [country, setCountry] = useState(spot?.country ?? '');
    const [streetAddress, setStreetAddress] = useState(spot?.streetAddress ?? "");
    const [city, setCity] = useState(spot?.city ?? "");
    const [state, setState] = useState(spot?.state ?? "");
    const [latitude, setLatitude] = useState(spot?.latitude ?? "");
    const [longitude, setLongitude] = useState(spot?.longitude ?? "");
    const [description, setDescription] = useState(spot?.description ?? "");
    const [title, setTitle] = useState(spot?.title ?? "");
    const [price, setPrice] = useState(spot?.price ?? "");
    const [previewImage, setPreviewImage] = useState(spot?.previewImage ?? "");
    const [imageUrlOne, setImageUrlOne] = useState(spot?.imageUrlOne ?? "");
    const [imageUrlTwo, setImageUrlTwo] = useState(spot?.imageUrlTwo ?? "");
    const [imageUrlThree, setImageUrlThree] = useState(spot?.imageUrlThree ?? "");
    const [imageUrlFour, setImageUrlFour] = useState(spot?.imageUrlFour ?? "");

    //State to track errors for various imp-ut fields
    //the value is the error message
    const [errors, setErrors] = useState(
        {
            'country': null,
            'street-address': null,
            'city': null,
            'state': null,
            'latitude': null,
            'longitude': null,
            'description': null,
            'title': null,
            'price': null,
            'preview-image': null,
            'image-url-one': null,
            'image-url-two': null,
            'image-url-three': null,
            'image-url-four': null
        }
    );

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
        'preview-image': setPreviewImage,
        'image-url-one': setImageUrlOne,
        'image-url-two': setImageUrlTwo,
        'image-url-three': setImageUrlThree,
        'image-url-four': setImageUrlFour
    };


    // this is shared, only one
    //event, things that start with on are events
    const onInputChange = event => {
        //event.target is the HTML element that caused the event
        const name = event.target.name;
        const value = event.target.value;

        //Look up the setter function for the field that just changed
        const setter = setters[name];

        //Invoke the setter function and update the value
        setter(value);

    }

    const onSubmit = event => {
        //errors dont show until button is clicked
        const valid = validate()
        if (!valid) {
            console.log("not valid")
            return
        }
        console.log("valid")

        console.log(event)
        //upon success navigate to the spot details page (spot/id)
    }

    //performing the validations
    const validate = () => {
        //Make a copy of the current error state
        const current = {}

        //Make sure country is set 
        if (!country) {
            current.country = "Country is required."
        }

        //make sure street address is set
        if (!streetAddress) {
            current['street-address'] = "Address is required."
        }

        //make sure city is set
        if (!city) {
            current.city = "City is required."
        }

        //make sure state is set
        if (!state) {
            current.state = "State is required."
        }

        //make sure state is set
        if (!latitude) {
            current.latitude = "Latitude is required."
        }

        //make sure longitude is set
        if (!longitude) {
            current.longitude = "Longitude is required."
        }
        //make sure description is set
        if (!description) {
            current.description = "Description is requireds."
        } else if (description.length < 29) {
            current.description = "Description needs a minimum of 30 characters."
        }

        //make sure title is set
        if (!title) {
            current.title = "Name is required."
        }

        //make sure price is set
        if (!price) {
            current.price = "Price is required."
        }
        
        const imageValidate = (imgUrl) => {
            const extension = imgUrl.split(".").pop().toLowerCase()

            if (extension === "jpg" || extension === "jpeg" || extension === "png") {
                return true
            }
            else {
                return false
            }
        };

        //make sure previewImage is set
        if (!previewImage) {
            current['preview-image'] = "Preview image is required."
        } else if (!imageValidate(previewImage)) {
            current['preview-image'] = "Image URL must end in .png, .jpg, or .jpeg"
        }


        //make sure imageUrlOne is set
        if (imageUrlOne && !imageValidate(imageUrlOne)) {
            current['image-url-one'] = "Image URL must end in .png, .jpg, or .jpeg"
        }

        //TODO: finish image url validations

        //Update error state
        setErrors(current)
        console.log(Object.keys(current))
        return Object.keys(current).length === 0

    }



    //The HTML that makes up the component
    return (
        <div className={'example'}>
            <div className='section'>
                <div className='title'>
                    { spot ? "Update your Spot" : "Create a new Spot?" } <br />
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
                    <label htmlFor='description'></label>
                    <textarea
                        name='description'
                        type='text'
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
                    Catch guests&apos; attention with a spot title that highlights what makes
                    your place special.
                </div>
                <div className='field'>
                    <label htmlFor='title'></label>
                    <input
                        name='title'
                        type='text'
                        placeholder='Name of your spot'
                        value={title}
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
                    Liven up your spot with photos
                </div>
                <div className='sub-title'>
                    Submit a link to at least one photo to publish your spot.
                </div>

                <div className='field'>
                    <label htmlFor='preview-image'></label>
                    <input
                        name='preview-image'
                        type='text'
                        placeholder='Preview image URL'
                        value={previewImage}
                        onChange={onInputChange}
                    />
                    {errors['preview-image'] && (<p className='errors'>{errors['preview-image']}</p>)}
                </div>

                <div className='field'>
                    <label htmlFor='image-url-one'></label>
                    <input
                        name='image-url-one'
                        type='text'
                        placeholder='Image URL'
                        value={imageUrlOne}
                        onChange={onInputChange}
                    />
                    {errors['image-url-one'] && (<p className='errors'>{errors['image-url-one']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='image-url-two'></label>
                    <input
                        name='image-url-two'
                        type='text'
                        placeholder='Image URL'
                        value={imageUrlTwo}
                        onChange={onInputChange}
                    />
                    {errors['image-url-two'] && (<p className='errors'>{errors['image-url-two']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='image-url-three'></label>
                    <input
                        name='image-url-three'
                        type='text'
                        placeholder='Image URL'
                        value={imageUrlThree}
                        onChange={onInputChange}
                    />
                    {errors['image-url-three'] && (<p className='errors'>{errors['image-url-three']}</p>)}
                </div>
                <div className='field'>
                    <label htmlFor='image-url-four'></label>
                    <input
                        name='image-url-four'
                        type='text'
                        placeholder='Image URL'
                        value={imageUrlFour}
                        onChange={onInputChange}
                    />
                    {errors['image-url-four'] && (<p className='errors'>{errors['image-url-four']}</p>)}
                </div>
            </div>
            <div className='section'>
                <button
                    onClick={onSubmit}
                >
                    { spot ? "Edit Spot" : "Create Spot" }
                </button>
            </div>

        </div>
    )
}

export default Example;