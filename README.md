ripple
======

The beginnings of a new library. See the discussion here: https://github.com/pemrouz/ripple/issues/1

Design Goals
* Maximise realtime interactivity (making it the default pattern rather than afterthought)
* Minimise development friction (convention over configuration)
* Keep it agnostic (small, high power-to-weight ratio API surface)
* Keep everything native (e.g. Object.observe, Plain Old Javascript Objects)
 
Roadmap
* [ ] Complete CRUD operations
* [ ] At least one more database adapter (~~MySQL~~, MongoDB, Neo4j)
* [ ] Make ripple components Web Component spec-compliant [i.e. Shadow DOM isolation, HTMLElement Registration] - (Google Maps, Lookups)
* [ ] Create more examples (persistence, multiple-server, different ripple-starters [client/server], React view, app [todo?])
* [ ] Add more shortcuts (e.g. jade/views, ripple/components, deprecate extensions)
* [ ] Open source ripple components (Google Maps, Lookups, Calendar)
* [ ] Objective-C Client
* [ ] Android Client
* [ ] Go one level deeper with MutationObservers
* [ ] Add unit tests