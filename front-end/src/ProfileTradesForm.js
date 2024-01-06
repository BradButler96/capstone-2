import { React, useState } from "react";
import { Button } from "reactstrap";
import './ProfileTradesForm.css';
import DropdownAsset from './DropdownAsset'


const ProfileTradesForm = ({ orderType, addTrade }) => {
    const initialState = {
        asset: '',
        quantity: '',
        price: '',
    }

    const [formData, setFormData] = useState(initialState);
    const [assetIDType, setAssetIDType] = useState('Name');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData, 
            orderType: orderType, 
            assetIDType: assetIDType
        }

        addTrade(data);
        // setFormData(initialState)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className='mt-4 row'>
                <div className='text-start col-4 d-flex'>
                    <DropdownAsset assetIDType={assetIDType} setAssetIDType={setAssetIDType} />
                </div>
                <div className='text-start col-4 d-flex align-items-center'>
                    <label className="col-12 h5" htmlFor='quantity'>
                            Quantity
                    </label>                
                </div>
                <div className='text-start col-4 d-flex align-items-center'>
                    <label className="h5 me-auto" htmlFor='price'>
                            Price ($)
                    </label>                
                </div>
            </div>
            
            <div className='row'>
                <div className='col-4 d-flex'>
                    <input 
                        required
                        type='text'
                        name='asset'
                        placeholder={assetIDType}
                        className="col-12 input-lg"
                        value={formData.asset || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-4 d-flex'>
                    <input 
                        required
                        type='number'
                        step='any'
                        min='0'
                        name='quantity'
                        placeholder='0.000000'
                        className="col-12 input-lg"
                        value={formData.quantity || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-4 d-flex'>
                    <input 
                        required
                        type='number'
                        step='any'
                        min='0'
                        name='price'
                        placeholder='0.00'
                        className="col-12 input-lg me-auto"
                        value={formData.price || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <Button 
                className='col-4 mx-auto my-4' 
                color="success" 
                size='lg'
                outline
            >Submit</Button>
        </form>
    )
}

export default ProfileTradesForm