import axios from 'axios';

const state = {
    divisions: [],
    divChildren: []
};

const getters = {
    divList: state => state.divisions,
    divChildren: state => state.divChildren
};

const actions = {
    async fetchDivisions({commit}){
        const response = await axios.get("http://localhost:3000/divisions");
        commit("setDivisions", response.data)
    },
    async fetchDivChildren({commit}, id){
        const response = await axios.get("http://localhost:3000/divisions/?id=" + id);
        commit("setDivChildren", response.data)
    },
    async addDivisions({commit}, division){
        console.log(division);
        const response = await axios.post("http://localhost:3000/divisions", division);
        commit("addNewDivision", response.data)
    },
    async deleteDivision({commit}, id){
        await axios.delete(`http://localhost:3000/divisions/${id}`);
        commit("removeDivision", id);
    },
    async updateDivision({commit}, division){
        const response = await axios.put(`http://localhost:3000/divisions/${division.id}`, division);
        commit("setNewFeaturesDivision", response.data);
    }
};

const mutations = {
    setDivisions: (state, divisions) => (
        state.divisions = divisions
    ),
    setDivChildren: (state, divisions) => (
        state.divChildren = divisions[0].children
    ),
    addNewDivision: (state, division) => state.divisions.unshift(division),
    removeDivision: (state, id) => (
        state.divisions.filter(division => division.id !== id),
        state.divisions.splice(div => div.id, 1)
    ),
    setNewFeaturesDivision(state, division) {
        // eslint-disable-next-line no-unused-vars
        let div = state.divisions.find(div => div.id === division.id)
        div = division;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}