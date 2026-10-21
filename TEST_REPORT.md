
# Test Report

## Summary

Civilization of Wonders was tested manually in a browser against the public deployment at https://civ-8-world-builder.vercel.app/ on 21 October 2026, and by a local technical build.

The application was also tested manually during development, including Google authentication, authorized editing, administrator takeover, terrain painting, persistence, and synchronization between clients.

The repository has no automated application test suite. `npm run build` completed successfully. This confirms that TypeScript compiles and Vite produces a bundle, but is not treated as proof that the application functions correctly.

The public deployment was checked for navigation, opening a world, SVG terrain rendering, zoom, minimap navigation, visitor statistics, geographic markers, the geolocation endpoint, and the wiki.

Authenticated editing required additional manual testing because it involves approved accounts, editing permissions, persistent database changes, and multiple browser sessions.

Some controlled tests remain unverified, particularly device classification across different user agents and registration when geolocation headers are missing.

An earlier observation recorded 33 visits, with Mac 22, Mobile 0, Windows 1, and Other 10. The later public-site observation used below recorded 36 visits.

## Test Results

| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --- | --- | --- | --- | --- |
| Four application views | R1 | Open the public site, select Legolas, then navigate to CoW Wiki and Visitors & Login. | All four views are available. World Builder becomes available after selecting a world. | PASS. Navigation worked as expected. |
| Open a stored world | R2 | Select Legolas in Map Gallery. | The selected world opens in World Builder. | PASS. Twelve world cards were displayed, and Legolas opened successfully. |
| Hexagonal world map | R3 | Open Legolas and inspect the main map and minimap. | A hexagonal world is rendered using SVG terrain graphics. | PASS. The world rendered successfully with ocean, coast, grass, desert, mountains, and other terrain graphics. |
| Zoom levels | R4 | Select zoom levels 1 and 2 and inspect the available controls. | Five zoom levels are available and the map changes scale. | PASS. Five zoom buttons were present, and the map scale changed correctly. |
| Minimap recentering | R4 | Click a different position on the minimap. | The main map recenters on the selected location. | PASS. The main map moved to the selected position. |
| Google sign-in control | R5 | Open Visitors & Login while signed out. | Google authentication is offered. | PASS. The Sign in with Google button appeared. |
| Fantasy identity after sign-in | R5 | Sign in with Google using an approved editor account. | The approved editor's fantasy identity is displayed and the appropriate permissions become available. | PASS — manually verified by the application developer. Google sign-in and the approved editor experience worked. The separate unapproved-account scenario was not independently documented. |
| Start, stop, and take over | R6 | Sign in as an assigned editor, start and stop editing, and test administrator takeover. | Authorized editors can control their sessions, and an administrator can take over. | PASS — manually verified by the application developer. Editing session controls and takeover worked. |
| Unauthorized editing | R6 | Open Legolas as an anonymous visitor while another editor is active. | Edit and Take Over are unavailable to the anonymous visitor. | PASS. The editor status was visible, while Edit and Take Over were hidden. Server-side rejection was not separately tested. |
| Administrator takeover | R6 | Sign in as an administrator while another editor holds Legolas, then choose Take Over. | The administrator takes control of the editing session. | PASS — manually verified by the application developer. Administrator takeover worked as intended. |
| Paint one hexagon | R7 | Start an authorized editing session, select terrain, and click a hexagon. | The selected hexagon changes to the chosen terrain. | PASS — manually verified by the application developer. Terrain painting worked. |
| Terrain persistence | R7 | Paint a hexagon and subsequently reload the world. | The terrain change remains after reloading. | PASS — manually verified by the application developer. Terrain changes were retained in Convex. |
| Cross-client synchronization | R7 | Open the same world in two clients and edit terrain in one client. | The other client displays the updated terrain without a manual refresh. | PASS — manually verified by the application developer. The shared world updated across clients. |
| One visit per page load | R8 | Record the visit counters, load the site, navigate internally, and reload. | Full page loads register visits, while internal navigation does not. | NOT RUN — a controlled before-and-after test was not documented. |
| Device classification | R8 | Load the application with known Windows, Mac, Mobile, and Other user agents. | The visitor module classifies each device correctly. | NOT RUN — no controlled four-category user-agent test was documented. |
| Permanent visitor statistics | R9 | Open Visitors & Login and inspect the statistics. | The permanent total and four device counters are displayed and add up correctly. | PASS. Total 36; Mac 23, Mobile 0, Windows 1, Other 12. The device counts add up to 36. |
| Geographic visitor markers | R10 | Inspect the visitor world map. | Stored visits with valid coordinates appear as colored SVG markers. | PASS. Sixteen markers appeared in Sweden, the Netherlands, and the USA. Mac markers were green, Windows red, and Other yellow. |
| Coordinates from the deployed site | R11 | Request `/api/visitor-location` on the deployed application. | Valid Vercel geolocation headers produce approximate coordinates. | PASS for the endpoint. HTTP 200 returned success with latitude 56.87767 and longitude 14.80906. |
| Missing visitor geolocation | R11 | Register a visit when geolocation headers are absent or invalid. | Registration succeeds without coordinates. | NOT RUN — a controlled missing-header test was not documented. |
| Wiki graphics catalog | R12 | Open CoW Wiki and select Base Terrains. | The selected SVG graphics category is displayed. | PASS. Base Terrains displayed Grass, Plains, Desert, Tundra, Snow, Coast, and Ocean. |

## Known Issues in Third-Party Modules

None found.

The application integrates two TypeScript modules:

- **midgard-hex-grid**, developed by Niklas Herrloff, provides hexagonal geometry, coordinates, positioning, and grid generation.
- **visitor-module**, developed by Felix, provides device classification for anonymous visitor statistics.

No defects were observed in Felix's module during application development and integration.

The module was successfully integrated into the visitor statistics functionality. However, a controlled classification test using all four device categories was not documented, so this report does not claim complete test coverage of the module.
