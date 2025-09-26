import React from 'react'

function GiftsVisible() {
    const gifts = [
  { id: 1, name: 'Gift Card', image: 'https://www.dealsplant.com/cdn/shop/products/dealsplant-gift-card-dealsplant-gift-card-14421034926155.jpg?v=1647760356', canWin: true },
  { id: 2, name: 'Headphones', image: 'https://cdn.thewirecutter.com/wp-content/media/2024/10/runningheadphones-2048px-09244-3x2-1.jpg?auto=webp&quality=75&width=1024', canWin: true },
  { id: 3, name: 'SuitCase', image: 'https://www.hindustantimes.com/ht-img/img/2024/09/02/1600x900/MixCollage-02-Sep-2024-10-23-AM-4894_cleanup_1725252896953_1725252913671.jpg', canWin: true },
  { id: 4, name: 'Smart Watch', image: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:2000,ch:1125,q:80,w:2000/FkGweMeB7hdPgaSFQdgsfj.jpg', canWin: true },
  { id: 5, name: 'Coupon', image: '/images/coupon.png', canWin: false },
];
  // Filter only gifts that can be won
  const availableGifts = gifts.filter(gift => gift.canWin);

  return (
    <section className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Gifts You Can Win</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableGifts.map(gift => (
          <div key={gift.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img
              src={gift.image}
              alt={gift.name}
              className="w-full h-32 object-contain mb-2"
            />
            <h3 className="text-center font-medium">{gift.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default GiftsVisible
