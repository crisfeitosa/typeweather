import './styles.css';
import { Spin } from '../Spin';

interface Props {
  isLoading?: boolean;
}

export function Input({ isLoading = false, ...rest }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="input" >
      <input type='text' {...rest} />

      {isLoading && <Spin />}
    </div>
  )
}