
// let myArrayToSort = [];
// let sortedData = [];

// function getBulletins() {
//     fetch('https://a73e223e97.us1.amezmo.co/jsonapi/node/newsletter/', {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/vnd.api+json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Create a new unordered list element
//         const listElement = document.createElement('ul');
//         listElement.id = 'my-list';

//         // Iterate through the newsletter items in the response data
//         data.data.forEach(item => {
//           const title = item.attributes.title
//           // convert string date to date object, to facilitate sorting
//           const createDateObjectToSort = new Date(item.attributes.field_date_to_sort_by)
//           // convert date to a number to optimzie sorting
//           const sortDate = createDateObjectToSort.getTime();
//           // Extract the URL of the image from the relationships object
//           const imageRelationshipUrl = item.relationships.field_newsletter.links.related.href;
//           // Make a second fetch call to get the image URL
//           fetch(imageRelationshipUrl, {
//             method: 'GET',
//             headers: {
//               'Accept': 'application/vnd.api+json'
//             }
//           })
//             .then(response => response.json())
//             .then(imageData => {
//               // Extract the URL of the image from the attributes object
//               const imageUrl = 'https://a73e223e97.us1.amezmo.co' + imageData.data.attributes.uri.url;
//               const myCurrentObject = {
//                 title: title,
//                 imageUrl: imageUrl,
//                 sortDate: sortDate
//               }
//               myArrayToSort.push(myCurrentObject);
//             })
//             .catch(error => console.error(error));
//         });
//       })
//       .catch(error => console.error(error));
//     }
    
//     getBulletins()

//     // The event listener further below (to show more), is only fired when Bulletins is clicked 
//     const weeklyBulletinsButton = document.querySelector('#attach-event-listener-to-show');
//     weeklyBulletinsButton.addEventListener('click', function() {
//         sortedData = myArrayToSort.sort((a, b) => b.sortDate - a.sortDate);
//         const listElement = document.createElement('ul');
//         listElement.id = 'my-list';
//         sortedData.forEach(function(item) {
//           const listItemElement = document.createElement('li');
//           const linkElement = document.createElement('a');
//           linkElement.textContent = item.title;
//           linkElement.href = item.imageUrl;
//           linkElement.target = '_blank';
//           listItemElement.appendChild(linkElement);
//           listElement.appendChild(listItemElement);
//         });
      
//         const targetElement = document.getElementById('append-things-here');
//         targetElement.appendChild(listElement);

//         // this is to show Bulletin number 4 onwards
//         const showMoreButton = document.querySelector('#clicking-here-will-show-more');
//         const listItems = document.querySelectorAll('#my-list li');
//         console.log('c')

//         showMoreButton.addEventListener('click', function() {
//         for(let i = 3; i < listItems.length; i++) {
//             listItems[i].style.display = 'block';
//         }
//         });
//     });






function getBulletins() {
    fetch('https://a73e223e97.us1.amezmo.co/jsonapi/node/newsletter/', {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const promises = data.data.map(item => {
          const title = item.attributes.title
          const createDateObjectToSort = new Date(item.attributes.field_date_to_sort_by)
          const sortDate = createDateObjectToSort.getTime();
          const imageRelationshipUrl = item.relationships.field_newsletter.links.related.href;
          return fetch(imageRelationshipUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/vnd.api+json'
            }
          })
            .then(response => response.json())
            .then(imageData => {
              const imageUrl = 'https://a73e223e97.us1.amezmo.co' + imageData.data.attributes.uri.url;
              return {
                title: title,
                imageUrl: imageUrl,
                sortDate: sortDate
              }
            })
            .catch(error => console.error(error));
        });
        Promise.all(promises).then(result => {
          myArrayToSort = result;
          sortedData = myArrayToSort.sort((a, b) => b.sortDate - a.sortDate);
          const listElement = document.createElement('ul');
          listElement.id = 'my-list';
          sortedData.forEach(function(item) {
            const listItemElement = document.createElement('li');
            const linkElement = document.createElement('a');
            linkElement.textContent = item.title;
            linkElement.href = item.imageUrl;
            linkElement.target = '_blank';
            listItemElement.appendChild(linkElement);
            listElement.appendChild(listItemElement);
          });
  
          const targetElement = document.getElementById('append-things-here');
          targetElement.appendChild(listElement);
  
          // this is to show Bulletin number 4 onwards
          const showMoreButton = document.querySelector('#clicking-here-will-show-more');
          const listItems = document.querySelectorAll('#my-list li');
          console.log('c')
  
          showMoreButton.addEventListener('click', function() {
            for(let i = 3; i < listItems.length; i++) {
              listItems[i].style.display = 'block';
            }
          });
        });
      })
      .catch(error => console.error(error));
  }
  

  getBulletins()