class CreateTaskCalendars < ActiveRecord::Migration
  def change
  	  	create_table :task_calendars do |t|
  		t.string :date
  		t.string :task
  	end
  end
end