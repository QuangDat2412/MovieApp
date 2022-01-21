import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { updateUser } from '../../redux/authRedux/apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

const Stripe = (props) => {
    const KEY = process.env.REACT_APP_STRIPE_KEY;
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.currentUser);

    const [stripeToken, setStripeToken] = useState(null);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 100,
                });
                updateUser(auth?._id, { isVip: true }, dispatch);
            } catch {}
        };
        stripeToken && makeRequest();
    }, [auth?._id, dispatch, stripeToken]);
    const onToken = (token) => {
        setStripeToken(token);
    };
    return (
        <StripeCheckout
            name="Movie App"
            image="https://avatars.githubusercontent.com/u/1486366?v=4"
            description={`Your total is $1.00`}
            amount={100}
            token={onToken}
            stripeKey={KEY}
        >
            {props.children}
        </StripeCheckout>
    );
};
export default Stripe;
