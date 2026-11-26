# First release

1. Create a public GitHub repository named `daily-energy-dashboard-card` and upload the contents of this folder, including `.github`. Enable Issues and add a description and the topics `home-assistant`, `lovelace`, and `energy`.
2. Enable the GitHub **Sponsor** button before publishing the release. The repository includes `.github/FUNDING.yml` with the same PayPal link as Browser Switchboard. Verify the Sponsor button on GitHub.
3. Run the Validate workflow and check both jobs. The Marketplace validation must pass without ignored checks.
4. Publish a full GitHub release, for example `v1.0.0`. The release workflow attaches `daily-energy-dashboard-card.js`. Check that the asset is present before sharing the release.
5. Test **Settings → Marketplace → Add from link** with the new repository URL. Install as Dashboard content, reload the frontend, and try the picker and visual editor in both languages.
6. For a public catalog entry, submit a pull request from your personal fork of [hacs/default](https://github.com/hacs/default). Add your repository alphabetically to the `plugin` file and complete the pull request template with the release and passing HACS validation links.

The repository slug and the MIT license are proposed release choices. Confirm the copyright attribution before publishing.

[Home Assistant dashboard packaging](https://contributors.home-assistant.io/marketplace/guides/dashboard/) · [Catalog submission](https://contributors.home-assistant.io/marketplace/guides/catalog/)
