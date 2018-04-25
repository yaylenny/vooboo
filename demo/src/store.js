import people from "./mock2.json";
import movies from "./mock3.json";

const state={
  movies,
  people
};
const modules={
};

const getters={
  movies: state=>state.movies,
  people: state=>state.people
};

const actions={
};

const mutations={
};

export default{ state, modules, getters, actions, mutations };
