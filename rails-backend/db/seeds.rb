# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Evaluation.destroy_all
Goal.destroy_all
User.destroy_all
Plan.destroy_all

_manager = User.create(name: 'Peter Boss', email: 'peter.boss@mycompany.com', manager_id: nil)

_johnDoe = User.create(name: 'John Doe', email: 'john.doe@mycompany.com', manager_id: _manager.id)
_joshBrown = User.create(name: 'Josh Brown', email: 'josh.brown@mycompany.com', manager_id: _johnDoe.id)
_petrNovak = User.create(name: 'Petr Novak', email: 'petr.novak@mycompany.com', manager_id: _johnDoe.id)
_tomHardy = User.create(name: 'Tom Hardy', email: 'tom.hardy@mycompany.com', manager_id: _johnDoe.id)
_adamNovotny = User.create(name: 'Adam Novotny', email: 'adam.novotny@mycompany.com', manager_id: _johnDoe.id)
_petrDvorak = User.create(name: 'Petr Dvorak', email: 'petr.dvorak@mycompany.com', manager_id: _johnDoe.id)
_emilStary = User.create(name: 'Emil Stary', email: 'emil.stary@mycompany.com', manager_id: _johnDoe.id)

_villaSye = User.create(name: 'Villa Sye', email: 'villa.sye@mycompany.com', manager_id: _manager.id)

_johnEvaluation = Evaluation.create(description: 'Velmi dobre plnil svoje ukoly.', rating: 10)
_joshEvaluation = Evaluation.create(description: 'Velmi dobre plnil svoje ukoly.', rating: 10)

johnPlan = Plan.create(start: '1.1.2016', end: '1.1.2017', status: 'completed', user_id: _johnDoe.id, evaluation_id: _johnEvaluation.id)
johnPlan = Plan.create(start: '1.1.2017', end: '1.1.2018', status: 'active', user_id: _johnDoe.id, evaluation_id: _johnEvaluation.id)
joshPlan = Plan.create(start: '1.1.2009', end: '1.1.2010', status: 'active', user_id: _joshBrown.id, evaluation_id: _joshEvaluation.id)
petrPlan = Plan.create(start: '1.1.2009', end: '1.1.2010', status: 'active', user_id: _petrNovak.id, evaluation_id: nil)
hardyPlan = Plan.create(start: '1.1.2009', end: '1.1.2010', status: 'active', user_id: _tomHardy.id, evaluation_id: nil)
novotnyPlan = Plan.create(start: '1.1.2009', end: '1.1.2010', status: 'active', user_id: _adamNovotny.id, evaluation_id: nil)

_goal1 = Goal.create(title: 'Diploma thesis', description: 'Write diploma thesis.', complexity: 'simple', priority: 'High', progress: 0, plan_id: johnPlan.id)
_goal2 = Goal.create(title: 'Rails backend', description: 'Create application backend in RoR', complexity: 'simple', priority: 'High', progress: 50, plan_id: johnPlan.id)

_goal1 = Goal.create(title: 'Diploma thesis', description: 'Write diploma thesis.', complexity: 'simple', priority: 'High', progress: 0, plan_id: joshPlan.id)
_goal1 = Goal.create(title: 'Diploma thesis', description: 'Write diploma thesis.', complexity: 'simple', priority: 'High', progress: 0, plan_id: petrPlan.id)
_goal1 = Goal.create(title: 'Diploma thesis', description: 'Write diploma thesis.', complexity: 'simple', priority: 'High', progress: 0, plan_id: hardyPlan.id)
_goal1 = Goal.create(title: 'Diploma thesis', description: 'Write diploma thesis.', complexity: 'simple', priority: 'High', progress: 0, plan_id: novotnyPlan.id)

