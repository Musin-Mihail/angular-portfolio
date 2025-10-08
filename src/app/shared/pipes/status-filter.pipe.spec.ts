import { StatusFilterPipe } from './status-filter.pipe';

describe('StatusFilterPipe', () => {
  const pipe = new StatusFilterPipe();

  const users = [
    { name: 'Анна', status: 'активен' },
    { name: 'Борис', status: 'неактивен' },
    { name: 'Виктория', status: 'активен' },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return only active items', () => {
    const result = pipe.transform(users, 'активен');
    expect(result.length).toBe(2);
    expect(result.every((u) => u.status === 'активен')).toBe(true);
    expect(result[0].name).toBe('Анна');
    expect(result[1].name).toBe('Виктория');
  });

  it('should return only inactive items', () => {
    const result = pipe.transform(users, 'неактивен');
    expect(result.length).toBe(1);
    expect(result[0].status).toBe('неактивен');
    expect(result[0].name).toBe('Борис');
  });

  it('should return an empty array if no items match', () => {
    const result = pipe.transform(users, 'удален');
    expect(result.length).toBe(0);
  });

  it('should return an empty array if input items are null', () => {
    const result = pipe.transform(null, 'активен');
    expect(result.length).toBe(0);
  });

  it('should return an empty array if status is empty', () => {
    const result = pipe.transform(users, '');
    expect(result.length).toBe(0);
  });
});
