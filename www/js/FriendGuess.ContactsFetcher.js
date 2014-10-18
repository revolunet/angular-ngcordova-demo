angular.module('FriendGuess.ContactsFetcher', [
    'FriendGuess.ImageFetcher',
    'ngCordova'
])

.service('ContactFinder', function($q, ImageFetcher) {
    // check if valid contact and ensure we have a valid photo
    return function(contact) {
        if (!contact.displayName) {
            return $q.reject(contact);
        }
        // check valid photo
        return ImageFetcher(contact.photos[0].value).then(function(photo) {
            contact.photo = photo;
            return contact;
        }).catch(function() {
            return $q.reject(contact);
        });
    };
})

.service('ContactsFinder', function($q, $filter, $cordovaContacts, ContactFinder) {
    // fetch n valid contacts
    function getValidContacts(contacts, results, max, index) {
        index = index || 0;
        //console.log('getValidContacts', arguments);
        return ContactFinder(results[index]).then(function(contact) {
            contacts.push(contact);
            return contact;
        }).catch(function(contact) {
            return false;
        }).then(function(contact) {
            index++;
            //results.splice(results.indexOf(contact), 1);
            if (contacts.length < max) {
                return getValidContacts(contacts, results, max, index);
            }
            return contacts;
        });
    }

    return function(nbContacts) {
        var contacts = [];
        return $cordovaContacts.find({
            fields: ['*']
        }).then(function(results) {
            // shuffle contacts
            results = $filter('shuffle')(results);
            // fetch N valid contacts
            return getValidContacts(contacts, results, nbContacts);
        });
    };

})

.filter('shuffle', function() {
    // shuffle an array
    return function(o) {
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
})

.service('getFriendsCells', function($q, $filter, ContactsFinder, ImageSplitter) {
    // return a list of cells we shuffled pictures and associated contact info
    return function(nbFriends, byLine) {

        return ContactsFinder(nbFriends).then(function(contacts) {

            var validContacts = {};

            return $q.all(contacts.map(function(contact) {
                // split images for each contact
                validContacts[contact.id] = contact;
                return ImageSplitter(contact.photo, byLine).then(function(cells) {
                    contact.cells = cells;
                    return contact;
                });
            })).then(function(contacts) {
                // arrange image parts by cell
                var cells = [];
                for (i = 0; i < byLine * byLine; i++) {
                    cells[i] = [];
                }
                for (i = 0; i < cells.length; i++) {
                    for (j = 0; j < contacts.length; j++) {
                        cells[i].push({
                            photo: contacts[j].cells[i],
                            contact: contacts[j]
                        });
                    }
                }
                return {
                    contacts: validContacts,
                    cells: cells.map($filter('shuffle'))
                };
            });
        });
    };
});
