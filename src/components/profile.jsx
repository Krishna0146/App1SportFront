import React from 'react';
import BuyerProfile from './Buyerprofile';
import SellerProfile from './SellerProfile';

const Profile = () => {
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;

    return (
        <div className="profile-page">
            {user ? (
                <>
                    {user.shopName ? (
                        <SellerProfile email={user.email} />  
                    ) : (
                        <BuyerProfile />
                    )}
                </>
            ) : (
                <p>Please sign in to check your account.</p>
            )}
        </div>
    );
};

export default Profile;
