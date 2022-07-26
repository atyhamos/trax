import './Loading.component.scss'

export const SmallLoading = () => {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export const BigLoading = () => {
  return (
    <div className='loading-screen'>
      <h1>Loading...</h1>
      <SmallLoading />
    </div>
  )
}
