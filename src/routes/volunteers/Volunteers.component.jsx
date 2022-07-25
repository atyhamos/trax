import './Volunteers.component.scss'

const Volunteers = () => {
  return (
    <div className='volunteers-container'>
      <h2>Volunteers</h2>
      <div className='table-container'>
        <h3 className='volunteer-name-label'>Name</h3>
        <span className='volunteer-name'>Amos</span>
        <span className='volunteer-name'>Betty</span>
        <span className='volunteer-name'>Chloe</span>
        <span className='volunteer-name'>Darwin</span>
        <span className='volunteer-name'>Ethan</span>
        <span className='volunteer-name'>Fred</span>
      </div>
    </div>
  )
}

export default Volunteers
