const breakpoints = [360, 768, 1024, 1440];
const mediaQuery = breakpoints.map((breakPoint) => `@media (max-width: ${breakPoint}px)`);

export default mediaQuery;
