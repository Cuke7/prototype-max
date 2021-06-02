export const state = () => ({
  user: null
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
      state.user = null;
    } else {
      const { uid, email, emailVerified, displayName, photoURL } = authUser;
      state.user = { uid, email, emailVerified, displayName, photoURL };
      console.log("Logged in", authUser);
    }
  }
};

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
};
