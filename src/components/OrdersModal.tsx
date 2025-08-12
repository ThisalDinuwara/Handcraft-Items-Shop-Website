import React, { useContext } from 'react';
import { X, Package, Calendar, MapPin, CreditCard, XCircle, Truck, CheckCircle } from 'lucide-react';
import { OrderContext } from '../context/OrderContext';

interface OrdersModalProps {
  onClose: () => void;
}

const OrdersModal: React.FC<OrdersModalProps> = ({ onClose }) => {
  const { orders, cancelOrder } = useContext(OrderContext);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'processing': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'shipped': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'delivered': return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'cancelled': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const canCancelOrder = (order: any) => {
    const daysSinceOrder = (new Date().getTime() - order.date.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceOrder <= 14 && order.status !== 'cancelled' && order.status !== 'delivered' && order.status !== 'shipped';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">My Orders</h2>
            {orders.length > 0 && (
              <span className="bg-amber-500 text-white text-sm px-2 py-1 rounded-full font-semibold">
                {orders.length}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-20 h-20 text-slate-600 mx-auto mb-6" />
              <h3 className="text-white text-2xl font-semibold mb-3">No orders yet</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Your orders will appear here once you make a purchase. Start exploring our beautiful handcrafted items!
              </p>
              <button 
                onClick={onClose}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-white font-bold text-lg">Order #{order.id}</h3>
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{order.date.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4" />
                          <span className="capitalize">{order.paymentMethod.replace('-', ' ')}</span>
                        </div>
                        <div className="text-amber-400 font-bold">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    {canCancelOrder(order) && (
                      <button 
                        onClick={() => cancelOrder(order.id)}
                        className="flex items-center space-x-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Cancel Order</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Package className="w-4 h-4 text-amber-400" />
                        <span>Items ({order.items.length})</span>
                      </h4>
                      <div className="space-y-3 max-h-40 overflow-y-auto">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 bg-slate-600/30 rounded-xl p-3">
                            <img 
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{item.name}</p>
                              <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-amber-400 font-semibold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span>Shipping Address</span>
                      </h4>
                      <div className="bg-slate-600/30 rounded-xl p-4">
                        <div className="text-slate-300 text-sm space-y-1">
                          <p className="font-medium">{order.address.street}</p>
                          <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                          <p>{order.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {canCancelOrder(order) && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <p className="text-xs text-slate-400 text-center">
                        You can cancel this order within 14 days of purchase 
                        ({Math.ceil(14 - (new Date().getTime() - order.date.getTime()) / (1000 * 60 * 60 * 24))} days remaining)
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;