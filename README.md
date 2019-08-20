# tempsensor
auth:  Adam Lamer
email: adam.lamer@gmail.com
desc:  A simple Node.js module for reading ds18b20 temperature sensor data on my Raspberry Pi.

I like to homebrew; yeast like certain temperature ranges.

My use case is the construction of a "fermentation chamber" of sorts. This consists of the fermentation vessle (a glass carboy) placed inside an insulated "box." On the technical side, I will monitor fermentation temperature using a Raspberry Pi and activate a relay with a heating/cooling element connected to make "corrections."

When starting this project, I checked a few pre-existing ds18b20 temperature sensor modules/libraries on npm (e.g. ds18b20-raspi), but they didn't seem to work as advertised. For ds18b20-raspi in particular, it would only ever find one sensor. Long story short: the only way I can make sure it works is to do it myself.

This is intended for use only on my project, but perhaps someone in the same boat will find it useful. If you have any questions/comments/concerns, feel free to reach out.
