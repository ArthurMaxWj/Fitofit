Walk.new(origin: "Rynek, Bochnia, Polska", destination: "Rynek Główny, Kraków, Polska", time_start: DateTime.now().to_i, 
  time_finish: (DateTime.now() + 30.minutes).to_i).save
Walk.new(origin: "Rynek Główny, Kraków, Polska", destination: "Rynek, Bochnia, Polska", time_start: DateTime.now().to_i).save
