type CardSBCProps = {
  title: string;
  onClick: () => void;
  selected: boolean;
  changeImg: string;
};

const CardSBC = ({title, onClick, selected, changeImg}: CardSBCProps) => {
  const cardClassName = ['rounded-xl hover:bg-gray-800 flex flex-col m-auto cursor-pointer border-2 w-full']
  if (selected) {
    cardClassName.push('border-primary-500 bg-gray-800')
  } else {
    cardClassName.push('bg-gray-900 border-gray-900')
  }
  // '/sbc.png' : process.env.PUBLIC_URL+'/sbc_gold.png' } />
  return (
    <div key={title} className={cardClassName.join(' ')} onClick={onClick}>
      <p className='pt-4 text-l'>
        {title}
      </p>
      <div className='mx-auto w-44'>
        
        <img alt={title} src={process.env.PUBLIC_URL + changeImg}/>
      </div>
    </div>
  )
}

export default CardSBC;
