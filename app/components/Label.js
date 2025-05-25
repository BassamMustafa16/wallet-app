export default function Label({content, labelFor}){
  return<label htmlFor={labelFor}>
    {content}
  </label>
}