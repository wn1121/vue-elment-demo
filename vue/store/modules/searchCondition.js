/**
 * Created by zhaijiazhen on 2018/3/5.
 */
const searchcondition = {
    state: {
        listPagePars: JSON.parse(localStorage.getItem('search')) || {}
    },
    mutations: {
        SAVE_LIST_PAGE_PARS: (state,{ path,pars }) => {
            //for(let k in pars){
            //    if(k == "pageNo" || k == "page_no" || k == "page"){
            //        pars[k] = 1;
            //    }
            //    if(k == "pageSize" || k == "pagesize" || k == "page_size"){
            //        pars[k] = 10;
            //    }
            //}
            state.listPagePars[path] = pars;
            localStorage.setItem('search', JSON.stringify(state.listPagePars));
        },
        RESET_SEARCH:(state) => {
            state.listPagePars = {};
        }
    },
    actions: {
        saveListPagePars: ({ commit },{path,pars}) => {
            commit('SAVE_LIST_PAGE_PARS',{ path,pars });
        },
        fillSearch:({state},{path,pars}) => {
            if(state.listPagePars[path] != 'undefined'){
                return state.listPagePars[path];
            }
            return pars;
        },
        resetForm3: ({ commit },{ form }) => {
            return new Promise((resolve, reject) => {
                for(var item in form){
                    if(item == "pageSize" || item == "pagesize" || item == "page_size"){
                        form[item] = 10;
                        continue;
                    }
                    if(item == "pageNo" || item == "page" || item == "page_no"){
                        form[item] = 1;
                        continue;
                    }
                    if(item == "is_authneed"){
                        continue;
                    }
                    form[item] = '';
                }
                resolve(form);
            })
        }
    }
};

export default searchcondition;
