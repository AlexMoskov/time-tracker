import axios from 'axios'
const csrf = document.getElementsByName('csrf-token')

if (csrf.length) {
    axios.defaults.headers.common = {
        'X-CSRF-TOKEN': csrf[0].content
    }
}

export default axios
