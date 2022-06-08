import { FunctionComponent } from 'react';
import styles from './dropButton.module.scss';

export default function DropButton({ Icon }: DropButtonProps) {
  return <button type="button">dummy</button>;
}

interface DropButtonProps {
  Icon: FunctionComponent;
}
