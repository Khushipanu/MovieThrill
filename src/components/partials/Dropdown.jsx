const Dropdown = ({title,option,func}) => {
  return (
<div className="select">
  <select defaultValue="0" onChange={func}
   name="format" id="format" aria-label={title}>
    <option value="0" disabled>
      {title}
    </option>
    {option.map((o)=>(
        <option key={o} value={o}>{o.toUpperCase()}</option>
    ))}
  </select>
</div>
  )
}

export default Dropdown
