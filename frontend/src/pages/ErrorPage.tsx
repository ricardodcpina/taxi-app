import { Link } from 'react-router-dom';
import { ErrorContainer } from '../components/styled/Error';

// Default error screen
export default function ErrorPage({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <>
      <ErrorContainer>
        <h1>{title || 'Oops! Página não encontrada!'}</h1>
        <p>
          {message || 'Não podemos localizar a página solicitada.'}
        </p>
        <p>
          <Link to='/request'>Voltar para tela inicial</Link>
        </p>
      </ErrorContainer>
    </>
  );
}
