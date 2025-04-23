<p align="center">
  <b>WME SDK+</b>
</p>

<p align="center">
  An extension library enhancing the native Waze Map Editor SDK for script developers.
</p>

## Description

WME SDK+ provides additional features, middleware capabilities, and utilities on top of the official Waze Map Editor (WME) SDK, designed to accelerate script development and bridge functionality gaps.

## Motivation

While we have an official WME SDK, its development is very slow, and it blocks the migration of scripts to the SDK. Once a feature in the WME SDK is implemented, it takes a lot longer for script writers to migrate to the SDK.

WME SDK+ is purposed to resolve this situation, by "patching" and adding the unimplemented functions to the SDK instances (extending the official SDK) and providing a unified implementation that is expected to match Waze's signatures for the methods, allowing a seamless transition to the official SDK once Waze implement the feature on their end.

## Documentation

For comprehensive information about getting started with SDK+, all APIs, features, configuration options, middleware action points, and advanced usage patterns, please refer to the [WME SDK+ Wiki](https://github.com/WazeSpace/wme-sdk-plus/wiki).

## Contribution

Contributions are highly welcome! We aim to make WME SDK+ a robust community-driven library.

Please see our [**Contributing Guidelines**](/CONTRIBUTING.md) if you're interested in helping improve WME SDK+.

## License

This add-on is licensed under the Apache License, Version 2.0. See the [LICENSE](/LICENSE) file for details.