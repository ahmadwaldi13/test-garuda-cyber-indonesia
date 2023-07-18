import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const productDetail = () => {

    const [products, setProducts] = useState()
    const [use, setUse]= useState("Use")
    const [useError, setUseError] = useState()
    const [id, setId] = useState()
    let [total, setTotal] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const [priceVoucher, setPriceVoucher] = useState(0)
    const [active, setActive]= useState(false)
    const [voucher, setVoucher] = useState()
    const router = useRouter()
    const token = Cookies.get("token")
    const customerId = Cookies.get('customerId')

    let productId
    
    const fetchProduct = async () => {
      if (router.query.id) {
        productId = router.query.id
        const response = await axios.get(`http://localhost:5000/api/v1/products/${productId}`)
        setProducts(response.data.data)
        setTotalPrice(response.data.data.price)
        setId(response.data.data.id)
        setVoucher(response.data.data.code_voucher)
      }
    }
    
    useEffect(() => {
      fetchProduct();
    }, [router.query.id])

    useEffect(()=> {
      if(totalPrice >= 2000000){
        setActive(true)
      } else {
        setActive(false)
      }
    }, [totalPrice])
    
      function formatCurrency(number) {
        const formatter = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        })
    
        return formatter.format(number)
      }
    
      function handleAddProductPlus() {
        console.info(products)
        total += 1
        setTotal(total)
        setTotalPrice(products.price * total)
      }

      function handleAddProductMinus() {
        if(total > 1 ){
          total -= 1
          setTotal(total)
          setTotalPrice(products.price * total);
        };
      }

      async function handleClickPay(){
        if (!token) {
          toast.error("anda harus login");
          router.push("/login");
        } else {
        router.push("/succes")
        }
      }

      function handleClickKembali(){
        window.location.href = "/";
      }

      async function handleClickUse(){
        try {
          if(totalPrice >= 200000) {
            const result = await axios.post('http://localhost:5000/api/v1/voucher', {
              customer_id: customerId ? customerId : undefined,
              code_voucher: voucher,
              total_price: totalPrice,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            if (result.status === 200) {
              setTotalPrice(result.data.data.resultVoucher)
              setPriceVoucher(result.data.data.voucher)
              setUse('voucher used')
            }
          }
        } catch (error) {
          setUseError(error.response.data.errors)
          toast.error(useError)
        }
      }
    return (
        <div className="relative h-screen bg-primary lg:bg-zinc-200 flex flex-col items-center font-quickSand">
          <div className="flex lg:fixed flex-col justify-center items-center gap-3 bottom-0 lg:top-[5%] bg-white lg:bg-white w-full lg:w-1/3 h-full lg:h-fit px-5 lg:px-4 lg:py-5 lg:rounded-xl">
            <div className="flex flex-col gap-3 w-full ">
              <div className="flex flex-col gap-2 px-3 py-5 rounded-lg">
    
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Product Name</h1>
                  <h1 className="text-black text-sm font-semibold">{products?.name}</h1>
                </div>
              
    
                
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Payment Method</h1>
                  <h1 className="text-black text-sm font-semibold">BRI</h1>
                </div>

                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Price</h1>
                  <h1 className="text-black text-sm font-semibold">{formatCurrency(products?.price)}</h1>
                </div>
            
    
               
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-black text-sm font-medium">Total product</h1>
                  <h1 className="text-black text-sm font-semibold">{total}</h1>
                </div>
               
              </div>
            <h1>{}</h1>
            <div className="bg-dark to-teal-500 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                  <h1 className="text-white text-sm font-medium">VOUCHER 10K</h1>

                  {use === 'Use' ? <button
                    onClick={handleClickUse}
                    className="text-primary bg-white inline-block px-4 py-2 rounded-full text-sm font-semibold"
                  >{use}</button> : <h1 className='text-white'>{use}</h1>}
                </div>
                <div className="border-t border-white pt-2">
                  <p className="text-white text-sm font-medium">Start Date: {products?.voucher.start_voucher.split("T")[0]}</p>
                  <p className="text-white text-sm font-medium">Expired Date: {products?.voucher.expired_voucher.split("T")[0]}</p>
                  <p className="text-white text-sm font-medium">Code Voucher: {products?.code_voucher}</p>
                </div>
                <p className="text-white text-xs mt-4">
                  Min <span className="text-lg font-semibold"> Rp 2.000.000</span>
                </p>
            </div>

            <div className="flex items-center gap-12 px-2 py-2 justify-center rounded-lg">
            {/* Tombol untuk menambahkan produk */}
            <button
                onClick={() => handleAddProductPlus()}
                className="flex p-2 justify-center items-center bg-dark rounded-full text-secondary font-medium text-2xl text-center "
            ><img src="/plus-icon.svg" className='w-7'/></button>

            <button
                onClick={() => handleAddProductMinus()}
                className="flex p-2 justify-center items-center bg-dark rounded-full text-secondary font-medium text-2xl text-center"
            ><img src="/minus-icon.svg" className='w-7'/></button>
            </div>
            <div className="flex items-center gap-12 px-2 py-2 justify-center rounded-lg">
              <div className="flex w-full justify-between items-center px-3 py-5 bg-gray-200 rounded-lg">
                <h1 className="text-black text-lg font-medium">Voucher</h1>
                <h1 className="text-black text-lg font-semibold">{priceVoucher ? formatCurrency(priceVoucher) : '-'}</h1>
              </div>
              <div className="flex w-full justify-between items-center px-3 py-5 bg-gray-200 rounded-lg">
                <h1 className="text-black text-lg font-medium">Order Total</h1>
                <h1 className="text-black text-lg font-semibold">{formatCurrency(totalPrice)}</h1>
              </div>
              </div>
              

              <div className="flex justify-center gap-2 px-3 py-5 rounded-lg">
  <button onClick={() => handleClickPay()} className="flex w-full justify-center items-center bg-dark px-4 py-2 rounded-lg">
    <div className="text-secondary text-sm font-bold">Pay</div>
  </button>
</div>

            </div>
          </div>
          <ToastContainer />
        </div>
      );
}
 
export default productDetail;