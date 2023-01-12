import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          url: 'img1.jpg',
          body: 'body1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          url: 'img2.jpg',
          body: 'body2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          url: 'img3.jpg',
          body: 'body3',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it('is should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts.');

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();
  });
});
