import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const handleBuy = async (priceId) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: priceId, quantity: 1 }],
      successUrl: 'https://blackflagtuning.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://blackflagtuning.com/cancel',
    });
    if (error) alert(error.message);
  };

  return (
    <div style={{ background: 'black', color: 'red', textAlign: 'center', minHeight: '100vh' }}>
      <div style={{ fontSize: '30vw', filter: 'drop-shadow(0 0 40px red)', animation: 'spin 20s linear infinite' }}>☠️</div>
      <h1 style={{ fontSize: '8vw', letterSpacing: '10px', textShadow: '0 0 30px red' }}>BLACK FLAG TUNING</h1>
      <div>
        <button onClick={() => handleBuy('price_GMUnlock')} style={{ background: 'red', color: 'black', padding: '20px', margin: '10px', fontSize: '2em' }}>GM Unlock - $79.99</button>
        <button onClick={() => handleBuy('price_FordUnlock')} style={{ background: 'red', color: 'black', padding: '20px', margin: '10px', fontSize: '2em' }}>Ford Unlock - $99.99</button>
        {/* Add more buttons for FCA, Toyota, etc. */}
      </div>
      <style jsx global>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
