import React, { useContext, useState } from 'react';
import { X, CreditCard, MapPin, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { items, total, clearCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [processing, setProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    
    // Payment
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process order
      const address = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      };

      const newOrderId = createOrder(
        items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        address,
        formData.paymentMethod
      );

      setOrderId(newOrderId);
      setOrderComplete(true);
      setProcessing(false);
      clearCart();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (orderComplete) {
    return (
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-slate-800 rounded-3xl max-w-md w-full p-8 text-center border border-slate-700 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h2>
          <p className="text-slate-300 mb-4 text-lg">
            Thank you for your purchase! Your order has been successfully placed.
          </p>
          <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-400 mb-1">Order ID</p>
            <p className="text-amber-400 font-mono font-bold text-lg">{orderId}</p>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            You'll receive a confirmation email shortly with tracking information.
          </p>
          
          <button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            {step === 2 && (
              <button 
                onClick={() => setStep(1)}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {step === 1 ? 'Shipping Information' : 'Payment Details'}
              </h2>
              <p className="text-slate-400 text-sm">Step {step} of 2</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <form onSubmit={handleSubmit} className="p-6">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-6 h-6 text-amber-400" />
                  <h3 className="text-white font-semibold text-lg">Delivery Address</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Street Address *</label>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({...formData, street: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="New York"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">State *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="NY"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="10001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Country *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-amber-400" />
                  <h3 className="text-white font-semibold text-lg">Payment Information</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center p-4 bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-white font-medium">Credit Card</span>
                    </label>
                    <label className="flex items-center p-4 bg-slate-700 rounded-xl cursor-pointer hover:bg-slate-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-white font-medium">PayPal</span>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Card Holder Name *</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Card Number *</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        required
                        className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                          required
                          className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">CVV *</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                          required
                          className="w-full bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="border-t border-slate-700 p-6 bg-slate-800/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-400">Total Amount</p>
              <p className="text-white text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-400">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={processing}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {processing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              step === 1 ? 'Continue to Payment' : 'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;