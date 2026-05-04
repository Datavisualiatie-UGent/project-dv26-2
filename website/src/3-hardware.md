# The Iron Reality

*If budget is the promise, hardware is the proof*

```js
import vegaEmbed from "npm:vega-embed";
```


To understand NATO’s strategic weight, we must look at the hard power sitting in hangars, motor pools, and docks across 32 nations.
Using data from Global Firepower 2026, we can look past the price tags to see the actual machines of war. [^7]

## Clear Skies

Being able to fly safely over long distances important not only for air operations, but also for ground support and logistics
NATO’s combined air fleets are enormous, yet they are a patchwork of capabilities, with the United States dominating in terms of numbers and advanced technology.
The USA is the unrivaled king of air superiority with modern combat systems like the F-35 and F-22.
To project power globally in a matter of hours, the US Air Force maintains a large fleet of Multi-Role Tanker Transports (MRTT) for in-air refueling, such as the KC-135, alongside heavy Fixed Wing Transport like the C-17.

<figure id="equipment-graphic" class="breakout" size="200">
  <div class="button-group">
    <input type="radio" id="tanks" name="equipment" value="tanks" checked>
    <label for="tanks">Tanks</label>
    <input type="radio" id="fighters" name="equipment" value="fighters">
    <label for="fighters">Fighters</label>
    <input type="radio" id="aircraft" name="equipment" value="aircraft">
    <label for="aircraft">Aircraft</label>
    <input type="radio" id="apc" name="equipment" value="apc">
    <label for="apc">APC</label>
    <input type="radio" id="spg" name="equipment" value="spg">
    <label for="spg">SPG Artillery</label>   
    <input type="radio" id="towed" name="equipment" value="towed">
    <label for="towed">Towed Artillery</label>
    <input type="radio" id="aircraft_carrier" name="equipment" value="aircraft_carrier">
    <label for="aircraft_carrier">Aircraft Carriers</label>
    <input type="radio" id="submarine" name="equipment" value="submarine">
    <label for="submarine">Submarines</label>
  </div>

  <div class="vis" id="vis-equipment"></div>
</figure>

```js
// Because Observable's `FileAttachment` cannot handle non-static strings
const files = {
  aircraft: FileAttachment("./plots/aircraft.json").json(),
  fighters: FileAttachment("./plots/fighters.json").json(),
  tanks: FileAttachment("./plots/tanks.json").json(),
  apc: FileAttachment("./plots/apc.json").json(),
  spg: FileAttachment("./plots/spg.json").json(),
  towed: FileAttachment("./plots/towed.json").json(),
  aircraft_carrier: FileAttachment("./plots/aircraft_carrier.json").json(),
  submarine: FileAttachment("./plots/submarine.json").json()
};

async function loadVis(type) {
  const spec = await files[type];
  const result = await vegaEmbed("#vis-equipment", spec, { actions: false });
}

const radios = document.querySelectorAll('input[name="equipment"]');
radios.forEach(radio => {
  radio.addEventListener("change", (event) => {
    loadVis(event.target.value);
  });
});

// Load default
const selected = document.querySelector('input[name="equipment"]:checked');
loadVis(selected.value);
```

TODO Add hyperlinks (or highlights on hover?) to more information about these names.

The alliance’s arsenal is a shared burden, forming a complex patchwork of air power that spans generations of aviation history.
While the United States operates the iconic A-10 Warthog for close air support, its NATO allies contribute a diverse array of high-end strike and interceptor capabilities.
This includes sophisticated European platforms like the French Dassault Rafale, the British-German Eurofighter Typhoon, and the Swedish JAS Gripen.

This collective shield is defined by its contrast.
While some members deploy cutting-edge 5th-generation stealth fighters like the F-35, others continue to rely on modernized but aging legacy systems.
This fleet ranges from the ubiquitous F-16 to Soviet-era MiG-29s, creating a mix of state-of-the-art technology and Cold War relics.
Ultimately, managing this variety of hardware highlights the challenge of interoperability within a 32-nation alliance.

TODO Move to explore?
> [!plot] explore-aircrafts
> TODO: pictogram chart showing total number of specific airplanes:
>
> - fighter jets, Multi-Role Tanker Transporters (MRTT) and Close Air Support (CAS) (ready/stock)
>

## The Steel Backbone of Ground Combat

While air power provides the shield, ground forces remain the ultimate sword of territorial integrity.
In the flatlands of Eastern Europe, strategic depth is measured in tracks and armor.
Modern land warfare relies on the interoperability between ground systems, like main battle tanks (MBTs) that provide breakthrough power, infantry fighting vehicles (IFVs) and armored personel carriers (APCs) which ensure infantry can move under protection of armor. [^8]
Where the US has the obvious upper hand in air capabilities, it is the European allies that hold a majority of modern MBTs, e.g. the German Leopard 2A7, French Leclerc and British Challenger 2.

> TODO: charts showing MBTs per country, IFVs and APCs

These systems rarely fight alone, but are rather supported by modern heavy artillery, both in the form of traditional self-propelled guns (SPGs) and towed artillery as in the form of multiple-launch rocket systems (MLRS).

> TODO: charts exploring artillery systems and mlrs

In order to quickly move troops and equipment across the continent and to the frontlines, NATO allies rely on rotary-wing transport helicopters (and previously mentioned fixed-wing transports).
Together with attack helicopters, these assets are crucial for rapid deployment, close air support, logistical resupply, and medical evacuation, especially in the challenging terrains of Eastern Europe.

> TODO: charts showing number of transport and attack helicopters

## Naval Power - The Unsung Shield

While NATO’s air and land forces often take the spotlight, its naval power forms a critical shield that is often overlooked.
The alliance’s combined naval fleet is a formidable force, with the United States leading the charge with its 11 aircraft carriers, 22 cruisers, and 68 destroyers.
European allies contribute a diverse array of frigates, submarines [^9], and amphibious assault ships that provide critical capabilities for maritime security, power projection, and anti-submarine warfare.

> TODO: charts showing number of aircraft carriers, cruisers, destroyers, frigates, submarines and amphibious assault ships\
> Note to self: check numbers in claims above

[^7]: Global Firepower data provides a quantitative snapshot, but does not account for qualitative force multipliers like training or logistical integration, however.

[^8]: In the past four years, it has also become increasingly clear that first-person view (FPV) drone warfare has gained a key role.
    We have not accounted for this, as there is limited data available.

[^9]: Submarines are a particularly important component of NATO’s naval strategy, providing stealthy platforms for intelligence gathering, special operations, and strategic deterrence.
    Only few countries operate submarines capable of launching ballistic (nuclear) missiles, which are a key component of NATO’s nuclear deterrence strategy and often form the most challenging part of obtaining a _nuclear triad_, i.e. the ability to launch nuclear weapons from land, air and sea.
    NATO's nuclear deterrence relies heavily on the United States, with only the UK and France maintaining independent nuclear arsenals, while other allies benefit from the extended deterrence provided by the US nuclear umbrella.
