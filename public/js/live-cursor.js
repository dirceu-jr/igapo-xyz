
// TODO:
// - May not update every movement to save some bandwidth;

let
  _map = document.getElementById('map'),
  available_colors = ['#62d2fd', '#3e63fb', '#807e97', '#fed861', '#febdbe', '#fd7384', '#f8cb75'],
  this_color = available_colors[Math.floor(Math.random() * available_colors.length)]
  ;

function getOrCreateCursorFor(user_name, color) {
  const existing = document.querySelector(`[data-sender='${user_name}']`);
  if (existing) {
    return existing;
  }

  const
    template = document.getElementById('cursor'),
    cursor = template.content.firstElementChild.cloneNode(true),
    svgPath = cursor.getElementsByTagName('path')[0]
    ;

  cursor.setAttribute("data-sender", user_name);
  svgPath.setAttribute('fill', `${this_color}`);

  document.body.insertBefore(cursor, _map);

  return cursor;
}

document.addEventListener('DOMContentLoaded', function () {
  firebase.analytics();

  // get query string
  const
    urlSearchParams = new URLSearchParams(window.location.search),
    params = Object.fromEntries(urlSearchParams.entries()),
    user_name = params['name']
    ;

  if (user_name !== undefined) {

    var user_ref = firebase.database().ref('users/' + user_name);

    // send
    document.body.onmousemove = (evt) => {
      user_ref.set({
        x: evt.clientX,
        y: evt.clientY,
        c: this_color
      });
    };

    // receive
    firebase.database().ref('/users').on('value', snapshot => {
      const data = snapshot.val();

      for (let item in data) {
        // if different than this user
        if (item !== user_name) {
          // create or move cursor
          const cursor = getOrCreateCursorFor(item, data[item].c);
          cursor.style.transform = `translate(${data[item].x}px, ${data[item].y}px)`;
        }
      }
    });
  }
});
