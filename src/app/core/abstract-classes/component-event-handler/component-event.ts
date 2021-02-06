export interface ComponentEvent<T, K> {
  // @param type: Tipo de evento
  // @data data: dados a serem passados pelo componente
  action: T;
  data: K;
}
