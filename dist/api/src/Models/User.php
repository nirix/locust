<?php
/*!
 * Locust
 * Copyright 2015 Jack Polgar
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace Locust\Models;

use Avalon\Database\Model;
use Avalon\Database\Model\SecurePassword;

/**
 * User model.
 */
class User extends Model
{
    use SecurePassword;

    /**
     * Property to use for the secure password trait.
     *
     * @var string
     */
    protected $securePasswordField = 'password';

    /**
     * Validations.
     *
     * @var array
     */
    protected static $_validates = [
        'username' => ['required'],
        'password' => ['required'],
        'email'    => ['required']
    ];

    /**
     * Before actions.
     *
     * @var array
     */
    protected static $_before = [
        'create' => ['preparePassword', 'generateSessionHash']
    ];

    /**
     * @return array
     */
    public function toArray()
    {
        $data = $this->getData();
        unset($data['password'], $data['session_hash']);
        return $data;
    }

    /**
     * Generate session hash.
     */
    protected function generateSessionHash()
    {
        $this->session_hash = sha1($this->email . time() . rand(0, 1000) . microtime());
    }
}
