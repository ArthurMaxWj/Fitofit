class CreateWalks < ActiveRecord::Migration[6.1]
  def change
    create_table :walks do |t|
      t.string :origin
      t.string :destination
      
      # type 'bigint' (instead of 'datetime'/'timestamp') helps omit any timezone conversions
      # Numbers are provided by JavaScript.
      t.bigint :time_start
      t.bigint :time_finish

      t.timestamps
    end
  end
end
