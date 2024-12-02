import {useEffect, useState} from 'react';

export function useDeliveryDetails(deliveryId) {
    const [delivery, setDelivery] = useState(null);
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDeliveryProjectAndClient = async () =>{
            try{
                console.log('yalo haré');
            }catch(e){
                console.log('ya lo haré');
            }
        }


    }, [])

}