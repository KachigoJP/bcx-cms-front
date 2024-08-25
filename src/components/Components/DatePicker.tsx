import React from 'react'
import DatePicker from 'react-datepicker'

const Component = React.forwardRef((props: any, ref) => {
  return (
    <DatePicker
      {...props}
      onChange={props.onChange}
      dateFormat="yyyy/MM/dd"
      autoComplete="off"
    />
  )
})

export default Component
