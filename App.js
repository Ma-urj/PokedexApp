import { LogBox } from 'react-native';
import Navigation from './navigation';

LogBox.ignoreAllLogs(true)

export default function App() {
  return (
    <Navigation />
  );
}
