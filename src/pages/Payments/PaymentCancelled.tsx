const PaymentCancelled = () => {
    return (
        <main className={'text-secondary text-center m-auto relative z-10'}>
            <div className='flex flex-col'>
                <p className='m-auto text-3xl pb-2'>Something went wrong in the payment process.</p>
                <p className='m-auto text-3xl pb-2'>Please try again.</p>
            </div>
        </main>
    )
}

export default PaymentCancelled