// https://vuex.vuejs.org/en/actions.html

export default {
  async exportPDF({ state, commit }, url, form) {
    let vm = this;
    state.app.busy = true;
    const { data } = await axios.post(url, form);
    state.app.busy = false;
    location.href =
      "/pdf/download?location=" + data.location + "&file=" + data.filename;
  },
  async exportCSV({ state, commit }, url, form) {
    let vm = this;
    state.app.busy = true;
    const { data } = await axios.post(url, form);
    state.app.busy = false;
    location.href =
      "/csv/download?location=" + data.location + "&file=" + data.filename;
  }
};
