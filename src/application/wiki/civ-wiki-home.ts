
export class CivWikiHome {
  createElement(): HTMLElement {
    const section = document.createElement('section')
    section.className = 'civ-wiki__section'

    const heading = document.createElement('h2')
    heading.className = 'civ-wiki__heading'
    heading.id = 'civ-wiki-home'
    heading.textContent = 'Welcome to Civilization of Wonders'

    section.setAttribute('aria-labelledby', heading.id)

    const introduction = document.createElement('p')
    introduction.textContent =
      'Welcome to the Civilization of Wonders Wiki, an encyclopedia ' +
      'dedicated to the landscapes, features, resources, and wonders ' +
      'of our world.'

    const worldHeading = document.createElement('h3')
    worldHeading.className = 'civ-wiki__subheading'
    worldHeading.textContent = 'Explore the world'

    const worldDescription = document.createElement('p')
    worldDescription.textContent =
      'Discover the different types of terrain that form our world, ' +
      'from rolling grasslands and golden deserts to snow-covered ' +
      'mountain peaks and vast oceans.'

    const encyclopediaHeading = document.createElement('h3')
    encyclopediaHeading.className = 'civ-wiki__subheading'
    encyclopediaHeading.textContent = 'The encyclopedia'

    const encyclopediaDescription = document.createElement('p')
    encyclopediaDescription.textContent =
      'Use the navigation menu on the left to explore the Wiki. ' +
      'Each section contains information about the elements ' +
      'used to create and shape the world.'

    const terrainHeading = document.createElement('h3')
    terrainHeading.className = 'civ-wiki__subheading'
    terrainHeading.textContent = 'Terrain graphics'

    const terrainDescription = document.createElement('p')
    terrainDescription.textContent =
      'Visit Base Terrains to explore our collection of original ' +
      'SVG terrain graphics, including flat landscapes, hills, ' +
      'and mountains.'

    section.append(
      heading,
      introduction,
      worldHeading,
      worldDescription,
      encyclopediaHeading,
      encyclopediaDescription,
      terrainHeading,
      terrainDescription,
    )

    return section
  }
}
