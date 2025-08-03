import { render, screen, waitFor } from '@testing-library/react';
import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';

import ResultPage from './ResultPage';

const renderWithRouter = (ui: ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('ResultPage', () => {
  it('정상적으로 장소가 렌더링된다', async () => {
    renderWithRouter(<ResultPage />);

    expect(screen.getByText('로딩중...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('왕십리역')).toBeInTheDocument();
    });
  });
});
