/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';


const app = {
    init: function () {
        app.readCandidats()
        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault()
            let candidatName = document.querySelector('#name').value
            if (candidatName !== undefined || candidatName.length != 0) {
                app.sendCandidat(candidatName)
            }
        })
    },
    readCandidats: async function () {
        let response = await fetch('/api/v1/candidat/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        let data = await response.json()
        if (response.ok) {
            if (data !== undefined || data.length != 0) {
                console.log(data)
                const membersList = document.querySelector('.member-list')
                membersList.innerHTML = ''
                data.forEach(element => {
                    let newCandidat = document.createElement('div')
                    let newContent = document.createTextNode(element.name)
                    newCandidat.classList.add('member-item')
                    newCandidat.appendChild(newContent)
                    membersList.appendChild(newCandidat)
                });
            }
        } else {
            console.error('an error occurred')
        }
    },

    sendCandidat: async function (candidatName) {
        let response = await fetch('/api/v1/candidat/add/' + candidatName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.ok) {
            await app.readCandidats()
            document.querySelector('#name').value = ''
        }
    },
}

window.addEventListener('DOMContentLoaded', function (e) {
    console.log('DOM fully loaded and parsed');
    app.init();
});


